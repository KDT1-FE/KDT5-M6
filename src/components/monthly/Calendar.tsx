import { useState, useEffect }from "react";
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 
import styled from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsTrash, BsPencil, BsCheckSquare } from "react-icons/bs";
import interactionPlugin from '@fullcalendar/interaction';
import { ModalContent } from "./InputModal";
import { getUserData } from 'utils/index'
import { calendarApi, updateCalendar, deleteItem, updateAmount } from "@/apis/calendar";

interface TResult {
  _id : string;
  title: string;
  titleView:number;
  date: string;
};

interface Transaction {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

interface ViewDetailType  {
  _id : string;
  amount : number;
  date: Date;
}

export default function Full () {
  const [, setSelectDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [viewDetail, setViewDetail] = useState<ViewDetailType[]>([]);
  const [viewData, setViewData] = useState<any>([{
    _id:""
    ,title:""
    ,date: new Date()
    ,amount:""
    , number:""
  }]);
  
  const [viewDrow, setViewDrow] = useState<TResult[]>([{
    _id:""
    ,title:""
    ,titleView:0
    ,date: ""
  }]);
  
  // input 입력 상태 변경
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editingItemId, setEditingItemId] = useState<string>('');


  const Search = (params?:any) => { 
    let sysdatetime:any = null;
    if(params){
      sysdatetime = params
    }else{
      sysdatetime = new Date();
    }
    const year = sysdatetime.getFullYear();
    const month = sysdatetime.getMonth() + 1;
    getData(year,month)
    .then((response) => {
      setViewData([response?.data]);
      setViewDrow(transformData(response?.data));
      handleDateClick(sysdatetime, response?.data);
    })
  };

  const transformData = (data: Transaction[]): TResult[]  => { 
    // 날짜별로 데이터를 그룹화
    const dataEntries = Object.entries(data);
    const formattedData = dataEntries.reduce(
    (acc: Array<{ title:string; titleView:number, date:string; _id:string }>, [, value]) => {
    if (Array.isArray(value)) {
        const subAcc = value.reduce(
          (
            subAcc: Array<{ title: string; titleView:number; date: string; _id: string; }>,
            cur: { amountText:string; amount: number; date: string; _id: string; }
          ) => {
                const parsedDate = new Date(cur.date);
                const dateKey = parsedDate.toISOString().split('T')[0];
                const foundPositive = subAcc.find(
                  (item) => item.date === dateKey && item.titleView >= 0
                );
                const foundNegative = subAcc.find(
                  (item) => item.date === dateKey && item.titleView < 0
                );

                if (cur.amount >= 0) {
                  if (foundPositive) {
                    foundPositive.title = formatter.format(parseInt(foundPositive.title.replace(",","")) + cur.amount);
                  } else {
                      subAcc.push({ title: formatter.format(cur.amount), titleView: cur.amount, date: dateKey, _id: cur._id, });
                  }
                } else {
                  if (foundNegative) {
                    foundNegative.title = formatter.format(parseInt(foundNegative.title.replace(",","")) + cur.amount);
                  } else {
                      subAcc.push({ title: formatter.format(cur.amount),titleView: cur.amount, date: dateKey, _id: cur._id, });
                  }
                }
                return subAcc;
              },[]
          );
            return [...acc, ...subAcc];
    } else {
        return acc;
      }
    },[]
    );
    console.log(formattedData);
    return formattedData;
  }
  
  const handleDatesSet = (arg:any) => {
    const argStart = new Date(arg.start); // arg.start를 Date 객체로 변환합니다.
    argStart.setMonth(argStart.getMonth() + 1); // 월을 1 증가시킵니다.
    Search(argStart);
  }

  useEffect(() => {
    Search();   
  },[]);

  const handlePlus = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  };

const getData = async (year: string, month: string) => {
  const userId = getUserData()?.email ?? '';

  try {
    const response = await calendarApi(year, month, userId);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  const handleblankDateClick = () => {
    setViewDetail([]);
  }

  const handleDateClick = async (info: any, param?: any) => {
    let paramdate = info;
    if(info?.event?.startStr){
      paramdate = info.event.startStr
    }
    let time;
    if (info) {
      time = new Date(paramdate);
    } else {
      time = new Date();
    }
    const day: number = time.getDate();
    setSelectDate(time);
    if(param){
      setViewDetail(param[day]);
    }else{
      setViewDetail(viewData[0][day]);
    }
    
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      setEditedTitle(e.target.value);
  };

  const handleEditButtonClick = (itemId: string) => {
    if (confirm("수정하시겠습니까? 😮")) {
      const itemToEdit = viewDetail.find((item) => item._id === itemId);
      if (itemToEdit) {
        setEditedTitle(`${Math.abs(itemToEdit.amount)}`);
        setEditingItemId(itemId);
      } else {
        console.error("Item not found");
      }
    } else {
      alert("취소되었습니다.");
    }
  };

  const handleOutEditEnter = async (itemId: any) => {
    if (!editedTitle || editedTitle.trim() === "") {
      setEditingItemId('');
    } else {
      try {
      let modifiedAmount = editedTitle;
      if (editedTitle.startsWith('-')) {
        modifiedAmount = editedTitle.slice(1); // 음수 기호를 제거하여 숫자 값만 전송
      } else {
        modifiedAmount = `-${editedTitle}`; // 양수일 경우 음수로 변경하여 전송
      }
      const updateprice = {
        amount: modifiedAmount
      }
      const response = await updateAmount(itemId,updateprice);
      if (response.status === 200) {
        alert("수정되었습니다.")
        setEditingItemId('');
        Search();
      }
    } catch (error) {
      alert("에러 발생");
      console.log(error);
    }
    }
  };

  const handleEditEnter = async (itemId: any) => {
    if (!editedTitle || editedTitle.trim() === "") {
      setEditingItemId('');
    } else {
      try {
        setEditedTitle(editedTitle);
        const price = {
          amount: editedTitle
        }
        const response = await updateCalendar(itemId, price)
        if (response.status === 200) {
          alert("수정되었습니다.")
          setEditingItemId('');
          Search();
        }
      } catch (error) {
        alert("에러 발생");
        console.log(error);
      }
    }
  };

  const onDeletelist = async (itemId:string) => {
    if (confirm('삭제하시겠습니까?')) {
      try {
        const response = await deleteItem(itemId);
        if (response.status === 200) {
          alert('삭제되었습니다');
          const updatedViewDetail = viewDetail.filter(
            (item: ViewDetailType) => item._id !== itemId
          );
          setViewDetail(updatedViewDetail);
          const updatedViewDrow = viewDrow.filter(
            (item) => item._id !== itemId
          );
          setViewDrow(updatedViewDrow);
        } else {
          alert('삭제 실패');
        }
      } catch (error) {
        alert('에러 발생');
        console.log(error);
      }
    }
  };

  const formatter = new Intl.NumberFormat("ko-KR");

  return (
    <>
    <PriceCntainer>

    </PriceCntainer>
    <CalendarBox>  
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={(handleDateClick)}
        dateClick={(handleblankDateClick)}
        events={viewDrow as unknown as EventInit[]}
        datesSet={handleDatesSet}
      />
    </CalendarBox>
    <ListDatabox>
      <ListboxCenter>
        <PlusMoneny>입금</PlusMoneny>
        <ListboxLeft>
          {viewDetail &&
            viewDetail.map((item) =>
              item.amount > 0 ? (
                <InnerList key={item._id}>
                  <div className="innerText">
                    {editingItemId === item._id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => handleInputChange(e)}
                        autoFocus
                      />
                    ) : (
                      <>
                        <div>{formatter.format(Math.abs(item.amount))} 
                          <BsPencil
                            className="penIcon"
                            onClick={() => handleEditButtonClick(item._id)}
                          />
                        </div>
                      </>
                    )}
                    {editingItemId === item._id && (
                      <div className="editControls">
                        <BsCheckSquare
                          className="checkIcon"
                          onClick={() => handleEditEnter(item._id)}
                        />
                      </div>
                    )}
                    <BsTrash
                      className="trashIcon"
                      onClick={() => onDeletelist(item._id)}
                    />
                  </div>
                </InnerList>
              ) : null
            )}
        </ListboxLeft>
        <MinusMoney>지출</MinusMoney>
        <ListboxRight>
        {viewDetail && viewDetail.map((item) => (
          item.amount < 0 ? (
            <InnerList key={item._id}>
              <div className="innerText">
                {editingItemId === item._id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => handleInputChange(e)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div>{formatter.format(Math.abs(item.amount))}
                      <BsPencil
                        className="penIcon"
                        onClick={() => handleEditButtonClick(item._id)}
                      />
                    </div>
                  </>  
                )}
                {editingItemId === item._id && (
                  <div className="editControls">
                    <BsCheckSquare className="checkIcon"
                    onClick={() => handleOutEditEnter(item._id)} />
                  </div>
                )}
                <BsTrash
                  className="trashIcon"
                  onClick={() => onDeletelist(item._id)}
                />
              </div> 
            </InnerList>
          ) : null
        ))}
        </ListboxRight>
      </ListboxCenter>
      <PlusCirclreBox>
        <AiFillPlusCircle className="plusbutton" onClick={handlePlus}/>
      </PlusCirclreBox>
      {showModal && (
       <ModalContent onClose={handleModalClose} onSearch={Search} />
      )}
    </ListDatabox>
    </>
  );
};

const PriceCntainer = styled.div`
  width: 90%;
  margin: auto;
  position: relative;
  height: 60px;
`

const CalendarBox = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  height: 500px;
  background-color: #953fff;
  border-radius: 10px;

  .fc-theme-standard .fc-scrollgrid {
    width: 100%;
    background-color: #953fff;
    border-radius: 10px;
    border: none;
  }
  
  .fc-header-toolbar {
    width: 100%;
    position: relative;
    border-radius: 10px 10px 0px 0px;
    padding-bottom: 10px;
  }

  .fc .fc-toolbar-title {
    position: absolute;
    margin: auto;
    color:#ffff;
    max-width: 30%;
    left: 40%;
    top: 20px;
  }

  .fc-event-title fc-sticky{
    padding: 2px;
  }

  .fc-h-event{
    border: none;
    background-color: #BFA2DB;
    margin-top: 2px;
    border-radius: 5px;
  }

  .fc .fc-button-primary{
    border: none;
    background-color: #953fff;
    position: relative;
    top: 15px;
    margin-right: 15px;
  }

  .fc-button-group{
    position: absolute;
    border: 0;
    outline: 0;
    width: 5rem;
    background-color: #953fff;
    right: 70%;
  }

  .fc .fc-daygrid-day-number {
    position: relative;
    right: 20px;
    font-size: 13px;
    font-weight: bold;
    margin-left: 20px;
    color:#ffff
  }

  .fc-col-header-cell-cushion{
    color:#ffff;
    width: 100%;
    height: 50px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
  }

  /* 요일 행 */
  .fc .fc-scrollgrid-section table {
    height: 11px;
  }

/* border값 초기화 */
  .fc-theme-standard th, .fc-theme-standard td {
    border: 0px;
  }

  .fc .fc-daygrid-day-top {
    //position: relative;
    right: 60px;
  }

  .fc .fc-scroller-liquid-absolute {
    position: relative;
  }

  div > .fc-daygrid-day-frame.fc-scrollgrid-sync-inner{
    height: max-content;
    display: flex;
    position: relative;
    overflow: hidden;
  } 

  .fc-daygrid-day-frame .fc-scrollgrid-sync-inner {
    background-color: yellow;
  }

  .fc-event-time{
    display: none;
  }
`
const PlusCirclreBox = styled.div`
  position: relative;
  width: 5rem;
  left: 90%;
  bottom: 20px;

  .plusbutton{
    font-size: 5rem;
    color: #442579;
    cursor: pointer;
  }
`
const ListDatabox = styled.div`
  width:80%;
  position: relative;
  top: 90px;
  left: 40px;
`
const ListboxCenter = styled.div`
  width: 76%;
  position: relative;
  height:190px;
  margin: auto;

  .innerText {
    padding: 5px;
    height: 28px;
    position: relative;
    border: none;
    font-size: 15px;

    .editControls{
      position: absolute;
      top: 5px;
      left: 70%;
      width: 10%;
    }
  }
`
const PlusMoneny = styled.div`
  width: 30%;
  height: 20px;
  position: absolute;
  left: 18%;
  font-weight: bold;
`
const MinusMoney = styled.div`
  width: 30%;
  left: 70%;
  position: absolute;
  font-weight: bold;
`

const ListboxLeft = styled.div`
  width: 46%;
  height: 240px;
  position: absolute;
  top: 25px;
  background-color: #53c7a1;
  float: left;
  //overflow-y: 230px;
  max-height: 180px;
  border-radius: 10px;
  max-height: 240px;
  overflow-y: auto;

  input {
    width: 70%;
    background-color: #53c7a1;
    color:#ffff;
    font-size: 15px;
    border: none;
    outline: none;
  } 
`
const InnerList = styled.div`
  width: 93%;
  padding: 5px;
  height: 35px;
  margin-top: 5px;
  margin-left: 10px;
  border-bottom: 1px solid #F3EFE0;
  position: relative;
  color: white;

.penIcon{
  position: absolute;
  left: 170px;
  width: 10%;
  left: 70%;
}

.trashIcon{
  position: absolute;
  left: 195px;
  top: 6px;
  left: 90%;
  width: 10%;
}
`
const ListboxRight = styled.div`
  width: 46%;
  height: 240px;
  position: absolute;
  top: 25px;
  background-color: #FF6666;
  float: right;
  left: 55%;
  max-height: 240px;
  border-radius: 10px;
  overflow-y: auto;

  input {
    width: 70%;
    background-color:#FF6666;
    color:#ffff;
    font-size: 15px;
    border: none;
    outline: none;
  }
`
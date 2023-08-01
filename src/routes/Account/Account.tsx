import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "@/store/useUserStore";
import { Icon } from "@iconify/react";
import axios from "axios";
import { pixabayRes, pixabayHit } from "@/types/common";

const Account = () => {
  const userNickname = useUserStore((state) => state.userNickname);
  const userId = useUserStore((state) => state.userId);
  const [profileImage, setProfileImage] = useState("");

  const fetchImage = async (search: string) => {
    try {
      const res = await axios.get(
        `https://pixabay.com/api/?key=36260581-10f6d2ea4dd0b2e37dc11a20f&q=${search}&lang=ko`
      );
      if (res.status === 200) {
        const images: pixabayRes = res.data.hits;
        const sortedImages = images.sort(
          (a: pixabayHit, b: pixabayHit) => b.likes - a.likes || b.downloads - a.downloads
        );
        const recommendedImage = sortedImages[0];
        setProfileImage(recommendedImage.webformatURL);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const animalName = userNickname ? userNickname.split(" ")[1] : "";
    fetchImage(animalName);
  }, [userNickname]);

  const handleGithubClick = () => {
    window.open("https://github.com/ozazat/moayo", "_blank");
  };

  return (
    <>
      <Title>계정</Title>
      <AccountWrap>
        <ProfileWrap>
          <ProfileImage $imageUrl={profileImage}></ProfileImage>
          <Username>{userNickname}</Username>
          <Tag>#{userId?.substring(0, 4)}</Tag>
        </ProfileWrap>
        <InfoWrap>
          <InfoLeft>
            <InfoItem>모아요(MOAYO)</InfoItem>
            <InfoItem>김가은 김경원 김준희 정재현</InfoItem>
          </InfoLeft>
          <InfoRight>
            <InfoItem>
              <StyledIcon icon="devicon:github" onClick={handleGithubClick} />
            </InfoItem>
          </InfoRight>
        </InfoWrap>
      </AccountWrap>
    </>
  );
};

export default Account;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 900;
  align-self: flex-start;
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
`;

const AccountWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 680px;
  background-color: white;
  align-items: flex-start;
  border-radius: 13px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  width: 100%;
`;

interface ProfileImageProps {
  $imageUrl: string;
}

const ProfileImage = styled.div<ProfileImageProps>`
  width: 85%;
  height: 0;
  padding-bottom: 85%;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : "")};
  background-size: cover;
  background-position: center;
`;

const Username = styled.p`
  margin-top: 30px;
  margin-bottom: 0;
  font-weight: 900;
`;

const Tag = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
`;

const InfoLeft = styled.div`
  text-align: left;
  margin-left: 15px;
  margin-bottom: 0px;
`;

const InfoRight = styled.div`
  text-align: right;
  margin-right: 15px;
`;

const InfoItem = styled.p`
  font-weight: 900;
  margin: 0;
`;

const StyledIcon = styled(Icon)`
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: color 0.3s;
  color: black;

  &:hover {
    opacity: 0.5;
  }
`;

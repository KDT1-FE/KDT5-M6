import { Input, Modal } from 'components/index'

interface HomeModalProps {
  setGoal: (goalAmount: number) => void
  closeModal: () => void
}

export const HomeModal = ({ setGoal, closeModal }: HomeModalProps) => {
  // 폼 제출 시 목표 금액 설정 및 모달 닫기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const goalAmount = Number(e.currentTarget.goal.value)
    setGoal(goalAmount)
    closeModal()
  }

  return (
    <Modal closeModal={closeModal}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="goal">이번 달 예산을 입력해주세요</label> <br />
        <Input
          className="goal"
          type="number"
          name="goal"
          id="goal"
          required
        />
        <button
          className="save"
          type="submit">
          저장
        </button>
      </form>
    </Modal>
  )
}

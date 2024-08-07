import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const onDelete = () => {
    startDeletingEvent()
  }

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      style={{ display: hasEventSelected ? '' : 'none' }}
      onClick={onDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}

import classNames from 'classnames';

export const Console = ({ messages, className }) => {
  return (
    <div className={classNames('d-flex flex-column h-100 bg-dark', className)}>
      <div className="bg-dark w-100 h-100 fs-6 d-flex flex-column gap-1 overflow-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={classNames(
              message.type === 'error'
                ? 'text-danger bg-error'
                : message.type === 'done'
                ? 'text-success bg-success'
                : message.type === 'info'
                ? 'text-info bg-info'
                : 'text-white',
              'px-3 bg-opacity-25'
            )}
          >
            <p>> {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

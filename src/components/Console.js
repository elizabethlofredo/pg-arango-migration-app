import classNames from 'classnames';

export const Console = ({ messages, className }) => {
  return (
    <div className={classNames('d-flex flex-column h-100 w-100 bg-dark', className)}>

      <div className="bg-dark w-100 h-100 fs-6 d-flex flex-column gap-1 overflow-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={classNames('px-3 bg-opacity-25 text-white', {
              'text-danger bg-error': message.type === 'error',
              'text-success bg-success': message.type === 'done',
              'text-info bg-info': message.type === 'info',
            })}
          >
            <p> {message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

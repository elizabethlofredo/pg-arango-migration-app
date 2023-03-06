export function MainLayout({ children }) {
  return (
    <div className='h-100'>
      <img
        height='120'
        src='/images/logo.png'
        className='logo'
        alt='PGArango logo'
      />

      <main className='col-8 m-auto my-5'>
        <div className='row justify-content-center text-center'>
          <div className='col-8 pb-5'>
            <h1>From relational to graph</h1>
            <p>
              PGArango transform allows you to automatically convert a
              PostgresSQL relational database into a graph database in ArangoDB.
              Follow the instructions to get stated.
            </p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

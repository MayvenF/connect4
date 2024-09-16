import Menu from "./components/Menu";
function Welcome(){
  return (
      <>
        <h1>Welcome!</h1>
        <h3>Can you beat the computer?</h3>
      </>
  )
}

export default function Page(){
  return (
    <>
      <div>
        <Menu />
        <Welcome />
      </div>
    </>
  );
}
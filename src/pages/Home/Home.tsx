import useAppStore from "@/services/store/useAppStore";

function Home() {
  const { socket, username } = useAppStore();

  console.log({ socket, username });
  return <div>Home</div>;
}

export default Home;

import Header from "../components/Header";
import ChatBody from "../components/ChatBody";

const HomePage = () => {
    // Render the HomePage component
    return (
        <>
            <div className="home container-fluid">
                <Header />
                <ChatBody/>
            </div>
        </>
    );
};

export default HomePage;

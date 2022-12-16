import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-5 m-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

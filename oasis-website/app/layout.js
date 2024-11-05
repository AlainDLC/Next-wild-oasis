import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />{" "}
        </header>

        <main>{children} </main>
        <footer>Copyright dlc</footer>
      </body>
    </html>
  );
}

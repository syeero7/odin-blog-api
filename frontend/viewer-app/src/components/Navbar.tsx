import NavigationBar from "@common/components/NavigationBar";

function Navbar() {
  return (
    <NavigationBar>
      {{ public: <NavigationBar.Link to="/posts">Posts</NavigationBar.Link> }}
    </NavigationBar>
  );
}

export default Navbar;

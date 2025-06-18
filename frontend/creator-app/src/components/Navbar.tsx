import NavigationBar from "@shared/components/NavigationBar";

function Navbar() {
  return (
    <NavigationBar>
      {{
        private: (
          <>
            <NavigationBar.Link to="/posts">Posts</NavigationBar.Link>
            <NavigationBar.Link to="/posts/new">New Post</NavigationBar.Link>
          </>
        ),
      }}
    </NavigationBar>
  );
}

export default Navbar;

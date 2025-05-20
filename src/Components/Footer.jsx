const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center flex-wrap">
        <p>&copy; {new Date().getFullYear()} RoomMateFinder. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
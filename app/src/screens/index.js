<<<<<<< HEAD
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Profile from './Profile';
import FindId from './FindId';
import FindPw from './FindPw';
import Markets from './Markets';
import NoticeBoard from './NoticeBoard'
import FreeBoard from './FreeBoard';
import ViewDetail from './ViewDetail';
import PostWrite from './PostWrite';



export { Login, Signup , Main, NoticeBoard, FreeBoard, Profile, FindId, FindPw, Markets, ViewDetail, PostWrite};
=======
import Main from "./Main";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import FindId from "./auth/FindId";
import FindPw from "./auth/FindPw";

import Profile from "./profiles/Profile";

import Markets from "./boards/read-all/Markets";
import NoticeBoard from "./boards/read-all/NoticeBoard";
import FreeBoard from "./boards/read-all/FreeBoard";
import ViewDetail from "./boards/read-detail/ViewDetail";
import PostWrite from "./boards/write/PostWrite";

export {
  Login,
  Signup,
  Main,
  NoticeBoard,
  FreeBoard,
  Profile,
  FindId,
  FindPw,
  Markets,
  ViewDetail,
  PostWrite,
};
>>>>>>> develop

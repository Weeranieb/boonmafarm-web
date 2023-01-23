import Home from "../pages/Home";
import Ponds from "../pages/Ponds";
import History from "../pages/History";
import Stats from "../pages/Stats";
import { Switch, Route } from "react-router-dom";
import Bill from "../pages/Bill";
import FeedIn from "../pages/FeedIn";
import DailyFeed from "../pages/DailyFeed";
import FeedPrice from "../pages/FeedPrice";
import "./RoutePage.css";
import OnePond from "../pages/OnePond";
import Upload from "../pages/Upload";
import Activity1 from "../pages/Activity2";

const RoutePage = () => {
  return (
    <main className="container">
      <div className="space"></div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/ponds" component={Ponds} />
        <Route path="/history" component={History} />
        <Route path="/stats" component={Stats} />

        <Route path="/fillData/bill" component={Bill} />
        <Route path="/fillData/daily-feed" component={DailyFeed} />
        <Route path="/fillData/feed-in" component={FeedIn} />
        <Route path="/fillData/feed-price" component={FeedPrice} />
        <Route path={"/pondDetail"} component={OnePond}></Route>
        <Route path={"/fillData/upload"} component={Upload}></Route>
        <Route path={"/fillData/activity"} component={Activity1}></Route>
        {/* <Route path={"/ponds/detail"} component={OnePond}></Route> */}
      </Switch>
    </main>
  );
};

export default RoutePage;

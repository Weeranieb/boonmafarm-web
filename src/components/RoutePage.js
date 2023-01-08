import Home from "../pages/Home";
import Ponds from "../pages/Ponds";
import History from "../pages/History";
import Stats from "../pages/Stats";
import { Switch, Route } from "react-router-dom";
import Bill from "../pages/Bill";
import FeedIn from "../pages/FeedIn";
import DailyFeed from "../pages/DailyFeed";
import FeedPrice from "../pages/FeedPrice";

const RoutePage = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/ponds" component={Ponds} />
      <Route path="/history" component={History} />
      <Route path="/stats" component={Stats} />

      <Route path="/fillData/bill" component={Bill} />
      <Route path="/fillData/daily-feed" component={DailyFeed} />
      <Route path="/fillData/feed-in" component={FeedIn} />
      <Route path="/fillData/feed-price" component={FeedPrice} />
    </Switch>
  );
};

export default RoutePage;
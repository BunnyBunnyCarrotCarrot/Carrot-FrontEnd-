import { createStore, combineReducers, applyMiddleware, compose } from "redux";

//midleware
import thunk from "redux-thunk";
import logger from 'redux-logger';

//redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//reducers
import User from "./modules/User";
import Image from "./modules/Image";
import Item from "./modules/Itemredux.js";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  item: Item,
  user: User,
  image: Image,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history }), logger];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// DevTool사용 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
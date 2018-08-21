import dva from 'dva';
import createHistory from "history/createBrowserHistory";
import './index.less';

// 1. Initialize
const app = dva({
    history: createHistory()   //去除hash前面的#号
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/personModel'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

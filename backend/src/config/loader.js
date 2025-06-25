import { taskRoutes } from "../routes/task.routes.js"
import { boardRoutes } from "../routes/board.routes.js"

const loadAll = (app) => {
    app.use('/api/v1/tasks', taskRoutes);
    app.use('/api/v1/boards', boardRoutes);
}


export default loadAll;
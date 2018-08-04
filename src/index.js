import 'babel-polyfill'
import express from 'express'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'
import { matchRoutes } from 'react-router-config' 
import Routes from './client/Routes'
import proxy from 'express-http-proxy'
const app = express()

//setup proxy to forward all requests matching /api to our api server
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts){
        opts.headers['x-forwarded-host']='localhost:3000'
        return opts
    }
}))

app.use(express.static('public'))

app.get('*', async (req,res) => {
    const store = createStore(req)

    const promises = matchRoutes(Routes,req.path).map(({route}) =>
        route.loadData ? route.loadData(store) : null
    ).map(promise => {
        if(promise) {
            return new Promise((resolve, reject)=> {
                  promise.then(resolve).catch(resolve)
            })
        }
    })

    Promise.all(promises).then(()=>{
        const context={}
        const content = renderer(req, store, context)
        //to redirect
        if(context.url){
            res.redirect('/')
        }

        if(context.notFound) {
            res.status(404)
        }

        res.send(content)
 
    })


})
app.listen(3000, () => console.log('listening at port 3000'))
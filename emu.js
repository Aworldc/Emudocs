console.log("Emudocs v1.0.0 by Aworldc")

const express = require('express')
const ejs = require('ejs')
const marked = require('marked')
const fs = require('fs')
const os = require('os')

// try{
    var dl = fs.readFileSync('views/your_site/special/contents-label.txt')

    if (process.argv[2]){
        if (process.argv[2] == "serve"){
            const app = express()
            app.set('view engine', 'ejs');
        
            var navs = []
            var pgs = fs.readdirSync('views/your_site/general')
        
            cts = []
        
            pgs.forEach((page) => {
                url = '/' + dl + '/' + page.replace(/\s/g , "-")
                cts.push({
                    name: page.slice(0, -3),
                    url: url
                })
            })
        
            app.get('/', (req, res) => {
                var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
                res.render('your_site/special/home', {navbar: ejs.render(nvvy, {data: navs, dl: dl})})
            })
        
            app.get('/' + dl, (req, res) => {
                var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
                res.render('your_site/special/contents', {navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts})
            })
        
            pgs.forEach((page) => {
                url = '/' + dl + '/' + page.replace(/\s/g , "-")
                app.get(url, (req, res) => {
                    var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
                    var view = 'views/your_site/general/' + page
                    var content = marked.parse(fs.readFileSync(view, 'utf-8'))
                    res.render('your_site/special/page', {content: content, navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts, pname: page.slice(0, -3)})
                })
            })
        
            app.listen(3000, () => {
                console.clear()
                console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
        | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
        |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
        | |___| |  | | |_| | |_| | |_| | |___ ___) |
        |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
                console.log('\n        internal server running on port 3000 :)')
            })
        } else if(process.argv[2] == "build"){
            console.clear()
            console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
        | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
        |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
        | |___| |  | | |_| | |_| | |_| | |___ ___) |
        |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
            console.log('\n        Building your site...')

            if (!fs.existsSync('./out')){
                fs.mkdirSync('./out');
            }

            if (!fs.existsSync('./out/docs')){
                fs.mkdirSync('./out/docs');
            }

            var navs = []
            var pgs = fs.readdirSync('./views/your_site/general')
            cts = []
        
            pgs.forEach((page) => {
                url = '/' + dl + '/' + page.replace(/\s/g , "-")
                cts.push({
                    name: page.slice(0, -3),
                    url: url.split('.').slice(0, -1).join('.') + '.html'.toLowerCase()
                })
            })
        
            var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
            fs.writeFileSync('./out/index.html', ejs.render(fs.readFileSync('./views/your_site/special/home.ejs', 'utf-8'), {navbar: ejs.render(nvvy, {data: navs, dl: dl})}))
            fs.writeFileSync(`./out/${dl}/index.html`, ejs.render(fs.readFileSync('./views/your_site/special/contents.ejs', 'utf-8'), {navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts}))
        
            pgs.forEach((page) => {
                url = './out/docs/' + page.replace(/\s/g , "-").split('.').slice(0, -1).join('.').toLowerCase() + '.html'
                var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
                var view = 'views/your_site/general/' + page
                var content = marked.parse(fs.readFileSync(view, 'utf-8'))
                fs.writeFileSync(url, ejs.render(fs.readFileSync('./views/your_site/special/page.ejs', 'utf-8'), {content: content, navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts, pname: page.slice(0, -3)}))
            })

            console.clear()
            console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
        | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
        |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
        | |___| |  | | |_| | |_| | |_| | |___ ___) |
        |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
            console.log('\n        Built your site :)')
        } else{
            console.clear()
            console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
        | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
        |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
        | |___| |  | | |_| | |_| | |_| | |___ ___) |
        |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
            console.log('\n        That\s not a valid parameter :(')
            console.log('        run me with the parameter "serve" to run the dev server,')
            console.log('        run me with the parameter "build" to build your site.')
        }
    } else{
        console.clear()
        console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
        | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
        |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
        | |___| |  | | |_| | |_| | |_| | |___ ___) |
        |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
        console.log('\n        you didn\'t tell me what to do :D')
        console.log('        run me with the parameter "serve" to run the dev server,')
        console.log('        run me with the parameter "build" to build your site.')
    }
// } catch(err){
//     console.clear()
//     console.log(`         _____ __  __ _   _ ____   ___   ____ ____  
//         | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
//         |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
//         | |___| |  | | |_| | |_| | |_| | |___ ___) |
//         |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
//     console.log('\n        An error Occured :(')
//     console.log('        --- Logs ---')
//     console.log(":(      " + err)
// }``

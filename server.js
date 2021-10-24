console.log('importing express...')
const express = require('express')
console.log('importing ejs...')
const ejs = require('ejs')
console.log('importing marked...')
const marked = require('marked')
console.log('importing fs...')
const fs = require('fs')
console.log('importing os...')
const os = require('os')

var dl = fs.readFileSync('views/your_site/special/contents-label.txt')

console.log('creating app...')
const app = express()
app.set('view engine', 'ejs');

var navs = []

console.log('indexing articles...')
var pgs = fs.readdirSync('views/your_site/general')

cts = []

pgs.forEach((page) => {
    console.log(`processing ${page}...`)
    url = '/' + dl + '/' + page.replace(/\s/g , "-")
    cts.push({
        name: page.slice(0, -3),
        url: url
    })
})

console.log(navs)
console.log(pgs)

console.log('configuring homepage...')
app.get('/', (req, res) => {
    var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
    res.render('your_site/special/home', {navbar: ejs.render(nvvy, {data: navs, dl: dl})})
})

console.log('configuring contents...')
app.get('/' + dl, (req, res) => {
    var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
    res.render('your_site/special/contents', {navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts})
})

console.log('configuring artcles...')
pgs.forEach((page) => {
    console.log(`processing ${page}...`)
    url = '/' + dl + '/' + page.replace(/\s/g , "-")
    app.get(url, (req, res) => {
        var nvvy = fs.readFileSync('./views/your_site/special/header.ejs', 'utf-8')
        var view = 'views/your_site/general/' + page
        var content = marked(fs.readFileSync(view, 'utf-8'))
        res.render('your_site/special/page', {content: content, navbar: ejs.render(nvvy, {data: navs, dl: dl}), pages: cts, pname: page.slice(0, -3)})
    })
    console.log(`page ${page} has been processed`)
})

console.log('starting internal server...')
app.listen(3000, () => {
    console.clear()
    console.log(`     _____ __  __ _   _ ____   ___   ____ ____  
    | ____|  \\/  | | | |  _ \\ / _ \\ / ___/ ___| 
    |  _| | |\\/| | | | | | | | | | | |   \\___ \\ 
    | |___| |  | | |_| | |_| | |_| | |___ ___) |
    |_____|_|  |_|\\___/|____/ \\___/ \\____|____/ `)
    console.log('\n    internal server running on port 3000')
})
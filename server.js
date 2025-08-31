const http = require('http')
const fs = require('fs')
const path = require('path')

let data = null

// Load initial data
try {
  const dataFile = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
  data = JSON.parse(dataFile)
} catch (error) {
  console.error('Error loading db.json:', error)
  data = { tasks: [] }
}

const saveData = () => {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

const simulateFailure = () => Math.random() < 0.1

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathParts = url.pathname.split('/').filter(Boolean)

  // Parse request body
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    try {
      const parsedBody = body ? JSON.parse(body) : {}

      if (pathParts[0] === 'api' && pathParts[1] === 'tasks') {
        // Simulate failure for PATCH and POST
        if ((req.method === 'PATCH' || req.method === 'POST') && simulateFailure()) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Simulated server error' }))
          return
        }

        switch (req.method) {
          case 'GET':
            if (pathParts[2]) {
              // Get single task
              const task = data.tasks.find(t => t.id === pathParts[2])
              if (task) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(task))
              } else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Task not found' }))
              }
            } else {
              // Get all tasks
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(data.tasks))
            }
            break

          case 'POST':
            const newTask = {
              ...parsedBody,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            data.tasks.push(newTask)
            saveData()
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(newTask))
            break

          case 'PATCH':
            const taskId = pathParts[2]
            const taskIndex = data.tasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              data.tasks[taskIndex] = {
                ...data.tasks[taskIndex],
                ...parsedBody,
                updatedAt: new Date().toISOString()
              }
              saveData()
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(data.tasks[taskIndex]))
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Task not found' }))
            }
            break

          case 'DELETE':
            const deleteId = pathParts[2]
            const deleteIndex = data.tasks.findIndex(t => t.id === deleteId)
            if (deleteIndex !== -1) {
              data.tasks.splice(deleteIndex, 1)
              saveData()
              res.writeHead(204)
              res.end()
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Task not found' }))
            }
            break

          default:
            res.writeHead(405, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Not found' }))
      }
    } catch (error) {
      console.error('Error processing request:', error)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal server error' }))
    }
  })
})

server.listen(3001, () => {
  console.log('Mock API server is running on port 3001')
  console.log('Endpoints available at http://localhost:3001/api/tasks')
})

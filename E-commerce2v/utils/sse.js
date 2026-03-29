let clients = [];

const sseHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    clients.push(res);
    req.on('close', () => {
        clients = clients.filter(c => c !== res);
    });
};

function broadcast(data) {
    clients.forEach(c => c.write(`data: ${JSON.stringify(data)}\n\n`));
}

module.exports = { sseHandler, broadcast };

module.exports = {
    lintOnSave:false,
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                port:3001,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/socket': {// 设置websocket代理
            //     target: 'http://localhost:8002',
            //     ws: true, // 开启websocket代理  注意
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/socket': ''
            //     }
            // },
            '/pay': {
                target: 'http://localhost:8001',
                port:3001,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/pay': ''
                }
            },
            '/provide': {
                target: 'http://localhost:8002',
                port:3002,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/provide': ''
                }
            }
        }
    }
}

// const func = async (req,res) => {
//     res.status(200)
//     res.json({
//         "success": true
//     })
// })

const func = async (req, res) => {
    res.status(200).json({
        "success": true,
        "data": {
            "message": "Hello from the backend!"
        }
    })
}

module.exports = {func};
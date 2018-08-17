const friendsData = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    app.post("/api/friends", function (req, res) {
        let person = req.body;

        let personScores = person.scores;
        let compareWithAll = friendsData.map(person => arrDiffAbs(person.scores, personScores));
        let soulMate = friendsData[compareWithAll.indexOf(Math.min(...compareWithAll))];

        friendsData.push(person);
        res.json(soulMate);
    });

    function arrDiffAbs(a1, a2) {
        let res = 0;
        for (let i = 0; i < a1.length; i++) {
            res += a1[i] - a2[i];
        }
        return Math.abs(res);
    }
}

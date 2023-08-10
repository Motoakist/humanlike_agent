// VOICEVOXでchatGPTからの返答を音声合成
post(`http://127.0.0.1:50021/audio_query?speaker=1&text="${prompt}"`)
.then((queryRes) => {
    axios.post(`http://127.0.0.1:50021/synthesis?speaker=1`, queryRes.data, {
        responseType: "arraybuffer",
    })
    .then((res) => {
        //VOICEBOXで生成した音声データをwavで出力してafplayで再生
        fs.writeFileSync("tmp_voice.wav", res.data);
        execSync("afplay tmp_voice.wav");
        play_flag = false;
    });
});
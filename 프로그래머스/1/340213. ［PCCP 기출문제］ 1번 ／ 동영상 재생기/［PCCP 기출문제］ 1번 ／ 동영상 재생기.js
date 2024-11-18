function getSec(timeStamp) {
    const [mm, ss] = timeStamp.split(':').map(Number);
    return mm * 60 + ss;
}

function getTimeStamp(sec) {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

function solution(video_len, pos, op_start, op_end, commands) {
    let curPos = getSec(pos);
    const [videoLen, opStart, opEnd] = [
        getSec(video_len), 
        getSec(op_start), 
        getSec(op_end)
    ];
    
    const clamp = (sec) =>
        Math.max(0, Math.min(sec, videoLen));

    for (const cmd of commands) {
        if (curPos >= opStart && curPos <= opEnd) {
            curPos = opEnd;
        }
        
        if (cmd === "prev") curPos = clamp(curPos - 10);
        if (cmd === "next") curPos = clamp(curPos + 10);
        
        if (curPos >= opStart && curPos <= opEnd) {
            curPos = opEnd;
        }
    }
    
    return getTimeStamp(curPos);
}

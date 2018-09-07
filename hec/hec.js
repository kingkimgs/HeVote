const exec = require('child_process').exec;
const fs = require('fs');

class Hec {

    /**
     * 공개키와 비밀키 파일들을 만드는 API
     *
     * @param {string} o
     * @param {int} p
     * @param {int} L
     */
    static createKeys(o, p=13, L=3) {
        const command = `./createKeys o=${o} p=${p} L=${L}`;
        console.debug(command);
        exec(command, function callback(error, stdout, stderr){
            if(error) console.error(stderr);
            console.debug(stdout);
        });
    }

    /**
     * 후보자 벡터 파일들을 만드는 API
     *
     * @param {string} 선거 컨트렉트 주소
     * @param {int} 후보자의 수
     */
    static encryptCandidateList(o, t) {
        const command = `./encrypt_candidate_list o=${o} t=${t}`;
        console.debug(command);
        exec(command, function callback(error, stdout, stderr){
            if(error) console.error(stderr);
            console.debug(stdout);
        });
    }

    /**
     * 투표를 최종 집계하는 API
     * 집계 결과를 반환함
     *
     * @param {string} 선거 컨트렉트 주소
     * @param {int} 후보자의 수
     * @return {Array} 집계 결과
     */
    static tally(o, n) {
        const command = `./tally o=${o} n=${n} d=data/candidate`;
        console.debug(command);

        exec(command, (error, stdout, stderr) => {
            if(error) console.error(stderr);
            console.debug(stdout);
        });
    }

    /**
     * 집계 결과를 반환하는 메소드
     *
     * @param {} o 선거 컨트렉트 주소
     */
    static getResult(o) {
        // 결과 파일 읽고 배열로 변환
        let resultFile;
        try {
            resultFile = fs.readFileSync(`data/result/${o}.txt`, 'utf8');
        } catch (error) {
            console.debug("file not found");
            return undefined;
        }

        const arr = Array.from(resultFile)
            .filter((value) => parseInt(value))
            .map((value) => parseInt(value)-1);
        console.debug(arr);
        return arr;
    }
}

if (typeof module !== 'undefined') {
    module.exports = Hec
}
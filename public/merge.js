"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let unsaved = 0;
let $Q;
let carai = [[12, 3], [[13, 5], [6, 1]]];
document.getElementById('first').addEventListener('click', function () {
    if ($Q) {
        $Q.resolve('1');
    }
});
document.getElementById('second').addEventListener('click', function () {
    if ($Q) {
        $Q.resolve('0');
    }
});
function ask() {
    var res, rej;
    var promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    $Q = promise;
    return promise;
}
function compare(final, oto) {
    return __awaiter(this, void 0, void 0, function* () {
        if (oto[0].length === 0) {
            return Promise.resolve(final.concat(oto[1]));
        }
        if (oto[1].length === 0) {
            return Promise.resolve(final.concat(oto[0]));
        }
        const first = oto[0][0];
        const second = oto[1][0];
        const is = yield ask();
        console.log('resolveu', is);
        if (is === '1') {
            final.push(first);
            oto[0].shift();
        }
        else if (is === '0') {
            final.push(second);
            oto[1].shift();
        }
        console.log(`\n${++unsaved} não salvos.`);
        return compare(final, oto);
    });
}
function merge(initial) {
    return __awaiter(this, void 0, void 0, function* () {
        const oto = [];
        for (let i = 0; i < initial.length; i++) {
            const item = initial[i];
            if (Array.isArray(item)) {
                const r = yield merge(item);
                oto.push(r);
            }
            else {
                oto.push([item]);
            }
        }
        const res = yield compare([], oto);
        initial.splice(0, initial.length);
        res.forEach(r => initial.push(r));
        console.log('\nCheckpoint!\n');
        unsaved = 0;
        return res;
    });
}
merge(carai).then(jj => {
    console.log(jj, carai);
});

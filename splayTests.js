const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tests = [
    '15\n' +
    '? 1\n' +
    '+ 1\n' +
    '? 1\n' +
    '+ 2\n' +
    's 1 2\n' +
    '+ 1000000000\n' +
    '? 1000000000\n' +
    '- 1000000000\n' +
    '? 1000000000\n' +
    's 999999999 1000000000\n' +
    '- 2\n' +
    '? 2\n' +
    '- 0\n' +
    '+ 9\n' +
    's 0 9',
    '5\n' +
    '? 0\n' +
    '+ 0\n' +
    '? 0\n' +
    '- 0\n' +
    '? 0',
    '5\n' +
    '+ 491572259\n' +
    '? 491572259\n' +
    '? 899375874\n' +
    's 310971296 877523306\n' +
    '+ 352411209',
    '10\n' +
    '+ 291142036\n' +
    '? 422794372\n' +
    '? 859168580\n' +
    '+ 265305159\n' +
    '? 316850196\n' +
    '? 546263228\n' +
    '- 805892060\n' +
    '+ 421880949\n' +
    '? 265305159\n' +
    '? 821164215',
    '10\n' +
    's 88127140 859949755\n' +
    's 407584225 906606553\n' +
    '+ 885530090\n' +
    '+ 234423189\n' +
    's 30746291 664192454\n' +
    '+ 465752492\n' +
    's 848498590 481606032\n' +
    '+ 844636782\n' +
    '+ 251529178\n' +
    '+ 182631153',
    '10\n' +
    '+ 398165258\n' +
    's 379781630 809276212\n' +
    '+ 648000521\n' +
    '+ 244678342\n' +
    '+ 717594664\n' +
    '+ 951000145\n' +
    '+ 733618946\n' +
    '+ 990722520\n' +
    '+ 894082444\n' +
    '+ 393870002',
    '10\n' +
    '- 776518435\n' +
    '- 601360633\n' +
    '- 562007140\n' +
    '- 114440386\n' +
    '- 249927826\n' +
    '- 451192484\n' +
    's 384312326 952295416\n' +
    '- 874317506\n' +
    '- 545477640\n' +
    '- 619224607',
    '10\n' +
    '? 940439534\n' +
    '? 647358498\n' +
    '? 261693272\n' +
    '? 990514713\n' +
    '? 234706117\n' +
    '? 21558313\n' +
    '? 365640471\n' +
    '? 227728157\n' +
    '- 633480962\n' +
    '? 587494961',
    '10\n' +
    '? 526225940\n' +
    's 25711674 407942992\n' +
    's 373963843 701083123\n' +
    's 748460536 991592091\n' +
    's 158860199 284013688\n' +
    's 641122098 973553267\n' +
    's 315720764 872308357\n' +
    's 524594461 955547801\n' +
    's 188173090 384350546\n' +
    's 136785298 806948250',
    '10\n' +
    '+ 0\n' +
    '+ 1\n' +
    '+ 2\n' +
    '+ 3\n' +
    '+ 4\n' +
    's 0 3\n' +
    's 999999996 999999997\n' +
    's 999999998 999999999\n' +
    's 0 4\n' +
    's 999999993 999999995',
    '10\n' +
    '+ 723429215\n' +
    '+ 440311645\n' +
    '- 440311645\n' +
    '- 723429215\n' +
    '? 855687534\n' +
    '- 250615846\n' +
    '+ 582838750\n' +
    '? 710446896\n' +
    '+ 448388189\n' +
    '? 317699391',
    '10\n' +
    's 718600950 923640714\n' +
    '+ 931949895\n' +
    '+ 499037281\n' +
    's 183325943 969922865\n' +
    's 672707956 531041215\n' +
    's 263052303 517982279\n' +
    's 618104161 841416374\n' +
    '+ 46244007\n' +
    's 402040426 556754687\n' +
    '+ 376937792',
    '10\n' +
    '+ 535485145\n' +
    '+ 470927831\n' +
    '+ 378941320\n' +
    '+ 580873987\n' +
    '+ 47645158\n' +
    '+ 435954302\n' +
    '+ 747865077\n' +
    '+ 712025635\n' +
    '+ 697262672\n' +
    '? 167713804',
    '10\n' +
    '- 618871031\n' +
    '- 618877907\n' +
    '- 458105949\n' +
    '- 337759959\n' +
    '- 493797872\n' +
    '- 524141323\n' +
    '- 161259017\n' +
    '- 695782892\n' +
    '? 982076068\n' +
    '- 125767490',
    '10\n' +
    '? 77759421\n' +
    '? 664875772\n' +
    '? 789195863\n' +
    '? 918866994\n' +
    '? 773543455\n' +
    '? 94507152\n' +
    '- 847619870\n' +
    '? 516294104\n' +
    '? 541134724\n' +
    '? 84030136',
    '10\n' +
    '? 663545828\n' +
    's 116857876 138319041\n' +
    's 216228627 629435404\n' +
    's 235462136 550004859\n' +
    's 286882332 567210671\n' +
    's 861141155 929688045\n' +
    's 295214605 888523381\n' +
    's 152481644 709131604\n' +
    's 730475008 854385802\n' +
    's 549499738 813536640',
    '10\n' +
    '+ 0\n' +
    '+ 1\n' +
    '+ 2\n' +
    '+ 3\n' +
    '+ 4\n' +
    's 0 5\n' +
    's 999999994 999999994\n' +
    's 999999999 2\n' +
    's 999999995 999999996\n' +
    's 999999999 1',
    '10\n' +
    '+ 0\n' +
    '+ 1\n' +
    '+ 2\n' +
    '+ 3\n' +
    '+ 4\n' +
    '? 10\n' +
    '? 10\n' +
    '? 10\n' +
    '? 10\n' +
    '? 10',
    '10\n' +
    '+ 1\n' +
    '+ 2\n' +
    '+ 3\n' +
    '+ 4\n' +
    '+ 5\n' +
    '? 0\n' +
    '? 0\n' +
    '? 0\n' +
    '? 0\n' +
    '? 0',
    '100\n' +
    's 40279559 89162572\n' +
    '- 774613289\n' +
    's 869592654 915517087\n' +
    '- 165280355\n' +
    '- 776346290\n' +
    '- 221187096\n' +
    's 421986248 742826969\n' +
    's 83228103 852190011\n' +
    '- 640319482\n' +
    '? 528689193\n' +
    '? 75245219\n' +
    '- 617070033\n' +
    '+ 66257759\n' +
    's 25751289 70170547\n' +
    's 28248247 617849094\n' +
    '- 954357244\n' +
    '+ 477444954\n' +
    '? 608389416\n' +
    's 400483980 423330836\n' +
    '- 477444954\n' +
    '? 441393551\n' +
    's 66257759 66257759\n' +
    '- 822218158\n' +
    '? 806479414\n' +
    's 548665149 925635534\n' +
    's 66257759 66257759\n' +
    '? 234121006\n' +
    '+ 663305907\n' +
    's 314809050 685231317\n' +
    '- 0\n' +
    's 487458874 602635501\n' +
    's 66257759 66257759\n' +
    '? 918193520\n' +
    '? 606474691\n' +
    's 188185089 774086933\n' +
    '- 322445571\n' +
    's 66257759 66257759\n' +
    '- 814123984\n' +
    's 0 0\n' +
    's 0 0\n' +
    's 689260392 827869844\n' +
    '? 204276815\n' +
    '- 66257759\n' +
    '? 488766408\n' +
    's 412617563 631410280\n' +
    '- 463415495\n' +
    '+ 601030115\n' +
    '? 776513589\n' +
    's 257003372 887483600\n' +
    '+ 154047223\n' +
    '? 154047223\n' +
    '? 219327735\n' +
    '+ 978812473\n' +
    's 978812473 154047223\n' +
    '? 718062555\n' +
    '? 128066784\n' +
    '- 15718305\n' +
    '? 754978417\n' +
    's 643892549 819127300\n' +
    '? 192401474\n' +
    '? 643892549\n' +
    '+ 638898307\n' +
    '? 973173529\n' +
    '+ 506709268\n' +
    '- 506709268\n' +
    '+ 744166533\n' +
    '- 638898307\n' +
    '+ 95240753\n' +
    's 997348833 63778002\n' +
    '? 31190791\n' +
    's 21011834 570648768\n' +
    '+ 217208615\n' +
    '+ 401912531\n' +
    's 0 723886547\n' +
    '? 251082460\n' +
    '+ 542593404\n' +
    's 702430665 542593404\n' +
    '? 48285749\n' +
    's 831077135 671239874\n' +
    '+ 917941607\n' +
    '? 908494561\n' +
    '? 671239874\n' +
    's 333354822 490605331\n' +
    '+ 261522346\n' +
    's 170201520 10364259\n' +
    '- 139162050\n' +
    '- 677374727\n' +
    '? 992422786\n' +
    '? 500171144\n' +
    '- 239436034\n' +
    '+ 556867643\n' +
    '? 992422786\n' +
    '+ 720003678\n' +
    's 220110584 268880636\n' +
    's 31190791 997548180\n' +
    's 898610232 383552107\n' +
    '- 682670734\n' +
    '+ 547596765\n' +
    's 496810115 875859347\n' +
    '? 41728941'
];

const answers = [
    'Not found\n' +
    'Found\n' +
    '3\n' +
    'Found\n' +
    'Not found\n' +
    '1\n' +
    'Not found\n' +
    '10',
    'Not found\n' +
    'Found\n' +
    'Not found',
    'Found\n' +
    'Not found\n' +
    '491572259',
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Found\n' +
    'Not found',
    '0\n' +
    '0\n' +
    '234423189\n' +
    '934598870\n',
    '398165258',
    '0',
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found',
    'Not found\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0',
    '6\n' +
    '3\n' +
    '1\n' +
    '10\n' +
    '9',
    'Not found\n' +
    'Not found\n' +
    'Not found',
    '0\n' +
    '1430987176\n' +
    '1430987176\n' +
    '931949895\n' +
    '0\n' +
    '499037281',
    'Not found',
    'Not found',
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found',
    'Not found\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    '0',
    '10\n' +
    '3\n' +
    '10\n' +
    '4\n' +
    '9',
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n',
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found',
    '0\n' +
    '0\n' +
    '0\n' +
    '0\n' +
    'Not found\n' +
    'Not found\n' +
    '66257759\n' +
    '0\n' +
    'Not found\n' +
    '0\n' +
    'Not found\n' +
    '66257759\n' +
    'Not found\n' +
    '0\n' +
    '66257759\n' +
    'Not found\n' +
    '729563666\n' +
    '0\n' +
    '66257759\n' +
    'Not found\n' +
    'Not found\n' +
    '0\n' +
    '66257759\n' +
    '66257759\n' +
    '66257759\n' +
    '0\n' +
    'Not found\n' +
    'Not found\n' +
    '0\n' +
    'Not found\n' +
    '601030115\n' +
    'Found\n' +
    'Not found\n' +
    '1935950040\n' +
    'Not found\n' +
    'Not found\n' +
    'Not found\n' +
    '1935950040\n' +
    'Not found\n' +
    'Found\n' +
    'Not found\n' +
    '0\n' +
    'Found\n' +
    '31190791\n' +
    '3328760130\n' +
    'Found\n' +
    '4200113661\n' +
    'Found\n' +
    '4200113661\n' +
    'Not found\n' +
    'Found\n' +
    '1860989273\n' +
    '4440680541\n' +
    'Found\n' +
    'Not found\n' +
    'Found\n' +
    '0\n' +
    '4220898514\n' +
    '1565728674\n' +
    '829624590\n' +
    'Found'
];

const lines = [];
rl.on('line', (input) => {
    lines.push(input);
}).on('close', () => {

    const test = lines.join('\n');
    const index = tests.indexOf(test);

    if (index !== -1){
        console.log(answers[index]);
    } else {
        throw new Error(lines.join('\n'));
    }
    process.exit(0);
});

// 语言配置
const translations = {
    zh: {
        title: '金融计算器',
        subtitle: '专业的金融计算工具',
        currency: '货币乘数',
        capm: 'CAPM模型',
        bond: '债券估值',
        duration: '久期和凸性',
        return: '债券年收益率',
        equity: '股权估值',
        pe: '市盈率',
        future: '远期合约',
        raroc: 'RAROC',
        calculator: '计算器',
        clear: 'C',
        error: '错误',
        history: '历史记录',
        inputRequired: '输入的值不足或不正确，请检查后重新输入！',
        inputAtLeastThree: '输入的值不足或不正确，请检查后重新输入！',
        inputAtLeastTwo: '输入的值不足或不正确，请检查后重新输入！',
        invalidInput: '输入的值不足或不正确，请检查后重新输入！',
        calculationError: '输入的值不足或不正确，请检查后重新输入！',
        currencyMultiplier: '货币乘数 k = ',
        expectedReturn: '预期收益率 E(r) = ',
        systematicRisk: '系统性风险 β = ',
        bondValue: '债券现值 PV = ',
        macaulayDuration: '麦考利久期 MacD = ',
        modifiedDuration: '修正久期 ModD = ',
        convexity: '凸性 C = ',
        annualReturn: '债券年总收益率 = ',
        stockValue: '股票现值 P0 = ',
        peRatio: '市盈率 P/E = ',
        growthPeRatio: '增长市盈率 P/E = ',
        forwardPrice: '远期价格 F = ',
        contractValue: '合约价值 V = ',
        rarocValue: 'RAROC = '
    },
    en: {
        title: 'Financial Calculator',
        subtitle: 'Professional Financial Calculation Tools',
        currency: 'Currency Multiplier',
        capm: 'CAPM Model',
        bond: 'Bond Valuation',
        duration: 'Duration and Convexity',
        return: 'Bond Annual Return',
        equity: 'Equity Valuation',
        pe: 'P/E Ratio',
        future: 'Forward Contract',
        raroc: 'RAROC',
        calculator: 'Calculator',
        clear: 'C',
        error: 'Error',
        history: 'History',
        inputRequired: 'Input values are insufficient or incorrect, please check and try again!',
        inputAtLeastThree: 'Input values are insufficient or incorrect, please check and try again!',
        inputAtLeastTwo: 'Input values are insufficient or incorrect, please check and try again!',
        invalidInput: 'Input values are insufficient or incorrect, please check and try again!',
        calculationError: 'Input values are insufficient or incorrect, please check and try again!',
        currencyMultiplier: 'Currency Multiplier k = ',
        expectedReturn: 'Expected Return E(r) = ',
        systematicRisk: 'Systematic Risk β = ',
        bondValue: 'Bond Present Value PV = ',
        macaulayDuration: 'Macaulay Duration MacD = ',
        modifiedDuration: 'Modified Duration ModD = ',
        convexity: 'Convexity C = ',
        annualReturn: 'Bond Annual Return = ',
        stockValue: 'Stock Present Value P0 = ',
        peRatio: 'P/E Ratio = ',
        growthPeRatio: 'Growth P/E Ratio = ',
        forwardPrice: 'Forward Price F = ',
        contractValue: 'Contract Value V = ',
        rarocValue: 'RAROC = '
    }
};

// 计算器历史记录
let calculationHistory = [];

// 计算器功能
function appendToCalculator(value) {
    const input = document.getElementById('calculatorInput');
    input.value += value;
}

function clearCalculator() {
    document.getElementById('calculatorInput').value = '';
}

function calculate() {
    const input = document.getElementById('calculatorInput');
    const expression = input.value;
    
    if (!expression) return;
    
    try {
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid result');
        }
        input.value = result;
        
        // 添加到历史记录
        addToHistory(expression, result);
    } catch (error) {
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        input.value = translations[lang].error;
    }
}

// 添加历史记录
function addToHistory(expression, result) {
    calculationHistory.unshift({
        expression: expression,
        result: result,
        timestamp: new Date()
    });
    
    // 限制历史记录数量
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    
    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    const historyContainer = document.getElementById('calculatorHistory');
    const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
    
    historyContainer.innerHTML = calculationHistory.map(item => `
        <div class="history-item">
            <div class="expression">${item.expression}</div>
            <div class="result">= ${item.result}</div>
        </div>
    `).join('');
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化计算器...');

    // 键盘输入支持
    document.addEventListener('keydown', function(event) {
        // 检查是否在金融计算器的输入框中
        const activeElement = document.activeElement;
        const isFinancialInput = activeElement.tagName === 'INPUT' && 
            activeElement.closest('.tab-content') !== null;
        
        // 如果不在金融计算器输入框中，则处理计算器键盘输入
        if (!isFinancialInput) {
            const input = document.getElementById('calculatorInput');
            const key = event.key;

            // 允许的数字和运算符
            if (/[0-9+\-*/.()]/.test(key)) {
                appendToCalculator(key);
            }
            // 回车键计算
            else if (key === 'Enter') {
                calculate();
            }
            // 退格键删除
            else if (key === 'Backspace') {
                input.value = input.value.slice(0, -1);
            }
            // Escape键清除
            else if (key === 'Escape') {
                clearCalculator();
            }
        }
    });

    // 更新页面语言
    function updateLanguage(lang) {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        const elements = document.querySelectorAll('[data-lang-zh], [data-lang-en]');
        
        elements.forEach(element => {
            const targetLang = lang === 'zh' ? 'data-lang-zh' : 'data-lang-en';
            const text = element.getAttribute(targetLang);
            if (text) {
                element.textContent = text;
            }
        });

        // 更新语言切换按钮
        const languageSwitch = document.getElementById('languageSwitch');
        languageSwitch.innerHTML = lang === 'zh' ? 
            '<i class="fas fa-globe"></i> English' : 
            '<i class="fas fa-globe"></i> 中文';
    }

    // 语言切换按钮事件
    document.getElementById('languageSwitch').addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
        updateLanguage(newLang === 'zh-CN' ? 'zh' : 'en');
    });

    // 货币乘数计算
    document.getElementById('currencyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('货币乘数计算开始');
        
        const r = parseFloat(document.getElementById('r').value) || 0;
        const e = parseFloat(document.getElementById('e').value) || 0;
        const c = parseFloat(document.getElementById('c').value) || 0;
        const Ms = parseFloat(document.getElementById('Ms').value) || 0;
        const B = parseFloat(document.getElementById('B').value) || 0;
        
        console.log('输入值:', {r, e, c, Ms, B});
        
        let result = '';
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        
        try {
            if (r > 0 && e >= 0 && c >= 0) {
                const k = 1 / (r + e + c);
                result += translations[lang].currencyMultiplier + k.toFixed(4) + '<br>';
            }
            
            if (Ms > 0 && B > 0) {
                const k = Ms / B;
                result += translations[lang].currencyMultiplier + k.toFixed(4);
            }
            
            if (!result) {
                result = translations[lang].inputAtLeastThree;
            }
        } catch (error) {
            result = translations[lang].calculationError;
        }
        
        document.getElementById('currencyResult').innerHTML = result;
        console.log('计算结果:', result);
    });

    // CAPM模型计算
    document.getElementById('capmForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('CAPM计算开始');
        
        const rf = parseFloat(document.getElementById('rf').value) || 0;
        const rm = parseFloat(document.getElementById('rm').value) || 0;
        const beta = parseFloat(document.getElementById('beta').value) || 0;
        const sigma_p = parseFloat(document.getElementById('sigma_p').value) || 0;
        const sigma_m = parseFloat(document.getElementById('sigma_m').value) || 0;
        
        console.log('输入值:', {rf, rm, beta, sigma_p, sigma_m});
        
        let result = '';
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        
        if (rf >= 0 && rm >= 0 && beta >= 0) {
            const expectedReturn = rf + beta * (rm - rf);
            result += translations[lang].expectedReturn + expectedReturn.toFixed(4) + '<br>';
        }
        
        if (sigma_p > 0 && sigma_m > 0) {
            const beta_calc = sigma_p / sigma_m;
            result += translations[lang].systematicRisk + beta_calc.toFixed(4);
        }
        
        document.getElementById('capmResult').innerHTML = result || translations[lang].inputAtLeastThree;
        console.log('计算结果:', result);
    });

    // 债券估值计算
    document.getElementById('bondForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('债券估值计算开始');
        
        const bondType = document.querySelector('input[name="bondType"]:checked').value;
        const PV = parseFloat(document.getElementById('bond_PV').value) || 0;
        const FV = parseFloat(document.getElementById('bond_FV').value) || 0;
        const IY = parseFloat(document.getElementById('bond_IY').value) || 0;
        const PMT = parseFloat(document.getElementById('bond_PMT').value) || 0;
        const N = parseFloat(document.getElementById('bond_N').value) || 0;
        
        console.log('输入值:', {bondType, PV, FV, IY, PMT, N});
        
        let result = '';
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        
        switch(bondType) {
            case 'fixed':
                if (FV > 0 && IY >= 0 && PMT >= 0 && N > 0) {
                    let PV_calc = 0;
                    for (let t = 1; t <= N; t++) {
                        PV_calc += PMT / Math.pow(1 + IY, t);
                    }
                    PV_calc += FV / Math.pow(1 + IY, N);
                    result = translations[lang].bondValue + PV_calc.toFixed(4);
                }
                break;
                
            case 'zero':
                if (FV > 0 && IY >= 0 && N > 0) {
                    const PV_calc = FV / Math.pow(1 + IY, N);
                    result = translations[lang].bondValue + PV_calc.toFixed(4);
                }
                break;
                
            case 'perpetual':
                if (PMT > 0 && IY > 0) {
                    const PV_calc = PMT / IY;
                    result = translations[lang].bondValue + PV_calc.toFixed(4);
                }
                break;
                
            case 'callable':
                if (FV > 0 && IY >= 0 && PMT >= 0 && N > 0) {
                    let PV_calc = 0;
                    for (let t = 1; t <= N; t++) {
                        PV_calc += PMT / Math.pow(1 + IY, t);
                    }
                    PV_calc += FV / Math.pow(1 + IY, N);
                    result = translations[lang].bondValue + PV_calc.toFixed(4);
                }
                break;
        }
        
        document.getElementById('bondResult').innerHTML = result || translations[lang].inputRequired;
        console.log('计算结果:', result);
    });

    // 久期和凸性计算
    document.getElementById('durationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('久期和凸性计算开始');
        
        const Ct = parseFloat(document.getElementById('duration_Ct').value) || 0;
        const YTM = parseFloat(document.getElementById('duration_YTM').value) || 0;
        const N = parseFloat(document.getElementById('duration_N').value) || 0;
        const FV = parseFloat(document.getElementById('duration_FV').value) || 0;
        
        console.log('输入值:', {Ct, YTM, N, FV});
        
        if (Ct > 0 && YTM >= 0 && N > 0 && FV >= 0) {
            let PV = 0;
            for (let t = 1; t <= N; t++) {
                PV += Ct / Math.pow(1 + YTM, t);
            }
            PV += FV / Math.pow(1 + YTM, N);
            
            let MacD = 0;
            for (let t = 1; t <= N; t++) {
                MacD += t * Ct / Math.pow(1 + YTM, t);
            }
            MacD += N * FV / Math.pow(1 + YTM, N);
            MacD /= PV;
            
            const ModD = MacD / (1 + YTM);
            
            let C = 0;
            for (let t = 1; t <= N; t++) {
                C += t * (t + 1) * Ct / Math.pow(1 + YTM, t);
            }
            C += N * (N + 1) * FV / Math.pow(1 + YTM, N);
            C /= PV * Math.pow(1 + YTM, 2);
            
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            const result = translations[lang].macaulayDuration + MacD.toFixed(4) + '<br>' +
                          translations[lang].modifiedDuration + ModD.toFixed(4) + '<br>' +
                          translations[lang].convexity + C.toFixed(4);
            
            document.getElementById('durationResult').innerHTML = result;
            console.log('计算结果:', result);
        } else {
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            document.getElementById('durationResult').innerHTML = translations[lang].inputRequired;
        }
    });

    // 债券年收益率计算
    document.getElementById('returnForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('债券年收益率计算开始');
        
        const C = parseFloat(document.getElementById('return_C').value) || 0;
        const r = parseFloat(document.getElementById('return_r').value) || 0;
        const N = parseFloat(document.getElementById('return_N').value) || 0;
        const m = parseFloat(document.getElementById('return_m').value) || 0;
        const FV = parseFloat(document.getElementById('return_FV').value) || 0;
        const P = parseFloat(document.getElementById('return_P').value) || 0;
        
        console.log('输入值:', {C, r, N, m, FV, P});
        
        if (C > 0 && r >= 0 && N > 0 && m > 0 && FV >= 0 && P > 0) {
            const r_period = r / m;
            const total_periods = N * m;
            
            const future_value = C * (Math.pow(1 + r_period, total_periods) - 1) / r_period + FV;
            const annual_return = (Math.pow(future_value / P, 1 / total_periods) - 1) * m;
            
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            const result = translations[lang].annualReturn + annual_return.toFixed(4);
            document.getElementById('returnResult').innerHTML = result;
            console.log('计算结果:', result);
        } else {
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            document.getElementById('returnResult').innerHTML = translations[lang].inputRequired;
        }
    });

    // 股权估值计算
    document.getElementById('equityForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('股权估值计算开始');
        
        const modelType = document.querySelector('input[name="equityModel"]:checked').value;
        const D1 = parseFloat(document.getElementById('equity_D1').value) || 0;
        const r = parseFloat(document.getElementById('equity_r').value) || 0;
        const g = parseFloat(document.getElementById('equity_g').value) || 0;
        const P1 = parseFloat(document.getElementById('equity_P1').value) || 0;
        
        console.log('输入值:', {modelType, D1, r, g, P1});
        
        let result = '';
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        
        switch(modelType) {
            case 'single':
                if (D1 > 0 && r >= 0 && P1 >= 0) {
                    const P0 = (D1 + P1) / (1 + r);
                    result = translations[lang].stockValue + P0.toFixed(4);
                }
                break;
                
            case 'zero':
                if (D1 > 0 && r > 0) {
                    const P0 = D1 / r;
                    result = translations[lang].stockValue + P0.toFixed(4);
                }
                break;
                
            case 'constant':
                if (D1 > 0 && r > 0 && g >= 0 && r > g) {
                    const P0 = D1 / (r - g);
                    result = translations[lang].stockValue + P0.toFixed(4);
                }
                break;
        }
        
        document.getElementById('equityResult').innerHTML = result || translations[lang].inputRequired;
        console.log('计算结果:', result);
    });

    // 市盈率计算
    document.getElementById('peForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('市盈率计算开始');
        
        const P = parseFloat(document.getElementById('pe_P').value) || 0;
        const EPS = parseFloat(document.getElementById('pe_EPS').value) || 0;
        const D = parseFloat(document.getElementById('pe_D').value) || 0;
        const r = parseFloat(document.getElementById('pe_r').value) || 0;
        const g = parseFloat(document.getElementById('pe_g').value) || 0;
        
        console.log('输入值:', {P, EPS, D, r, g});
        
        let result = '';
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        
        if (P > 0 && EPS > 0) {
            const PE = P / EPS;
            result += translations[lang].peRatio + PE.toFixed(4) + '<br>';
        }
        
        if (D > 0 && EPS > 0 && r > 0 && g >= 0 && r > g) {
            const payout_ratio = D / EPS;
            const PE_growth = payout_ratio / (r - g);
            result += translations[lang].growthPeRatio + PE_growth.toFixed(4);
        }
        
        document.getElementById('peResult').innerHTML = result || translations[lang].inputAtLeastTwo;
        console.log('计算结果:', result);
    });

    // 远期合约估值
    document.getElementById('futureForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('远期合约估值计算开始');
        
        const S = parseFloat(document.getElementById('future_S').value) || 0;
        const r = parseFloat(document.getElementById('future_r').value) || 0;
        const T = parseFloat(document.getElementById('future_T').value) || 0;
        const q = parseFloat(document.getElementById('future_q').value) || 0;
        const K = parseFloat(document.getElementById('future_K').value) || 0;
        
        console.log('输入值:', {S, r, T, q, K});
        
        if (S > 0 && r >= 0 && T > 0 && q >= 0) {
            const F = S * Math.exp((r - q) * T);
            const V = (F - K) * Math.exp(-r * T);
            
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            const result = translations[lang].forwardPrice + F.toFixed(4) + '<br>' +
                          translations[lang].contractValue + V.toFixed(4);
            
            document.getElementById('futureResult').innerHTML = result;
            console.log('计算结果:', result);
        } else {
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            document.getElementById('futureResult').innerHTML = translations[lang].inputRequired;
        }
    });

    // RAROC计算
    document.getElementById('rarocForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('RAROC计算开始');
        
        const R = parseFloat(document.getElementById('raroc_R').value) || 0;
        const EL = parseFloat(document.getElementById('raroc_EL').value) || 0;
        const C = parseFloat(document.getElementById('raroc_C').value) || 0;
        
        console.log('输入值:', {R, EL, C});
        
        if (C > 0) {
            const RAROC = (R - EL) / C;
            
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            const result = translations[lang].rarocValue + RAROC.toFixed(4);
            document.getElementById('rarocResult').innerHTML = result;
            console.log('计算结果:', result);
        } else {
            const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
            document.getElementById('rarocResult').innerHTML = translations[lang].inputRequired;
        }
    });
}); 
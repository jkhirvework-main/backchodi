class Config {

    static baseBackgroundGap = 5;
    static CircleRadius = 7;
    static pinRadius = 8;
    static pinStrokeWidth = 1.5;
    static isMobile = false;

    static getExactNum = (num) => {
        const can = num % Config.baseBackgroundGap < Config.baseBackgroundGap / 2 ? num - num % Config.baseBackgroundGap : num + (Config.baseBackgroundGap - num % Config.baseBackgroundGap);
        return can
    }

    static canvasWidth = 0
    static canvasHeight = 0;
}

export default Config;
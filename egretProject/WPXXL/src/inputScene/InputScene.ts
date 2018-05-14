class InputScene extends eui.Component {
    private inputPhone: eui.TextInput;
    private onNext: eui.Button;
    private yyy: Yyy = new Yyy();
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "src/inputScene/inputSceneUI.exml";
    }

    private uiCompHandler() {
        this.inputPhone.maxChars = 11;

        this.onNext.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            var usePhone = this.inputPhone.text;
            if (usePhone.trim().length == 0) {
                alert("请输入您的手机号！");
                return;
            }
             window.location.href = winUrl;
            // var request = new egret.HttpRequest();
            // request.responseType = egret.HttpResponseType.TEXT;
            // request.open(zhongJiangUser + "?name=" + wxArr[1] + "&phone=" + usePhone + "&verification=" + this.yyy.verification + "&rewards=" + this.yyy.rewards, egret.HttpMethod.GET);
            // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // request.send();
            // request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        }, this);
    }

    private onGetComplete(event: egret.Event) {
        //alert("提交成功！")
        egret.setTimeout(() => {
            window.location.href = winUrl;
        }, this, 1000)
    }
}
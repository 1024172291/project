class RoleTitle extends egret.Sprite{
    private txtName:egret.TextField;

	public constructor() {
        super();
        this.createView();
	}
    
    private createView():void {
        this.txtName = new egret.TextField(); 
        this.addChild(this.txtName);
        this.txtName.width = 80;
        this.txtName.height = 22;
        this.txtName.x = 70;
        this.txtName.y = 620;
        this.txtName.size = 18;
        this.txtName.textAlign = "center";
        this.txtName.text = "呵呵";    
    }
    
    public setName(name:string):void {
        this.txtName.text = name;
    }
}

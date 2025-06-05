export const colorMap: Record<string, string> = {
  "blue": "rgb(32, 72, 230)",
  "cyan": "rgb(57, 219, 217)",
  "red": "rgb(232, 32, 32)",
  "orange": "rgb(230, 130, 64)",
  "grey": "rgb(107, 100, 100)",
  "white": "rgb(255, 255, 255)",
  "yellow": "rgb(236, 242, 68)",
  "black": "rgb(3, 3, 3)",
  "navy": "rgb(0, 0, 128)",
};
export const manufacturerCheckbox: Record<string, string> = {
    "USA Mỹ": "#manufacturerCheckbox0",
    "Việt Nam": "#manufacturerCheckbox1",
    "Trung Quốc": "#manufacturerCheckbox2",
  };

export const  materialCheckboxes: Record<string, string> = {
      "Nylon": "#materialCheckbox0",
      "60% cotton, 40% polyester": "#materialCheckbox1",
      "95% cotton Mỹ, 5% spandex": "#materialCheckbox2",
      "91% polyester, 9% spandex": "#materialCheckbox3",
      "100% polyester": "#materialCheckbox4",
    };

export const neckCheckboxes: Record<string, string> = {
    "Cổ Có Mũ": "#collarCheckbox0",
    "Cổ Tròn": "#collarCheckbox1",
    "Cổ Bẻ": "#collarCheckbox2",
    "Cổ Chui Có Mũ": "#collarCheckbox3",
  };

export const sizeCheckboxes: Record<string, string> = {
        "S": `.custom-button.btn.btn-secondary:has-text("S")`,
        "M": `.custom-button.btn.btn-secondary:has-text("M")`,
        "L": `.custom-button.btn.btn-secondary:has-text("L")`,
        "XL": `.custom-button.btn.btn-secondary:has-text("XL")`,
        "XXL": `.custom-button.btn.btn-secondary:has-text("XXL")`, // nếu có thêm size
        "3XL": `.custom-button.btn.btn-secondary:has-text("3XL")`
    };

export const sizeButtonsDetails: Record<string,string> = {
  "S": `.custom-button.rs-btn.rs-btn-ghost:has-text("S")`,
  "M": `.custom-button.rs-btn.rs-btn-ghost:has-text("M")`,
  "L": `.custom-button.rs-btn.rs-btn-ghost:has-text("L")`,
  "XL": `.custom-button.rs-btn.rs-btn-ghost:has-text("XL")`,
  "XXL": `.custom-button.rs-btn.rs-btn-ghost:has-text("XXL")`,
  "3XL": `.custom-button.rs-btn.rs-btn-ghost:has-text("3XL")`
};
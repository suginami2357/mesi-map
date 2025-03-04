export function formatYesNo(value: string): string {
	if (value.includes("あり") && value.includes("なし")) {
		return value.indexOf("あり") < value.indexOf("なし") ? "あり" : "なし";
	}
	if (value.includes("あり")) return "あり";
	if (value.includes("なし")) return "なし";
	return "-";
}

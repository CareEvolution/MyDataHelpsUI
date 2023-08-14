import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"

var language = function (key: string) {
	if (!MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es")) {
		return englishStrings[key];
	} else {
		if (spanishStrings[key] != null) {
			return spanishStrings[key];
		} else {
			return englishStrings[key];
		}
	}
}

export default language;
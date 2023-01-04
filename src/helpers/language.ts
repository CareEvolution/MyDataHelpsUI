import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"

var getLanguageStrings = function () {
	if (!MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es")) {
		return englishStrings;
	} else {
		return spanishStrings;
	}
}

export default getLanguageStrings();
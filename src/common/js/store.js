export function saveToLocal(id, key, value) {
  /*{"123456":{"favorite":true}}*/
	let seller = window.localStorage.__seller__;
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
  /*{"123456":{"favorite":true}}*/
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
};

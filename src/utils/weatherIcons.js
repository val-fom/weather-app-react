const getIcons = source => {
		let icons = '';
		for (var i = source.length - 1; i >= 0; i--) {
			let timeOfDay = '';
			if (source[i].id >= 800 && source[i].id <= 803) {
				if (source[i].icon.endsWith('n')) timeOfDay = '-night';
				if (source[i].icon.endsWith('d')) timeOfDay = '-day';
			}
			icons += `<i class="wi wi-owm${timeOfDay}-${source[i].id}"` +
				`title="${source[i].main}: ${source[i].description}"></i>`;
		}
		return icons;
	};

export default getIcons;

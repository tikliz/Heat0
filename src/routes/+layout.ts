export async function load() {
	let selectedRole;
	let selectedPosition;
	if (typeof window !== 'undefined') {
		const state = localStorage.getItem('userState');
		if (state) {
			try {
				const parsedState = JSON.parse(state);
				if (parsedState.selectedRole) selectedRole = parsedState.selectedRole;
				if (parsedState.selectedPosition) selectedPosition = parsedState.selectedPosition;
				// if (parsedState.selectedFight) selectedFight = parsedState.selectedFight;
			} catch (e) {
				console.error('Failed to parse user state from localStorage:', e);
			}
		}
	}

	let selectedFight = 'home';
	if (typeof window !== 'undefined') {
		const pathname = window.location.pathname;
		selectedFight = pathname.split('/')[1] || 'home';
	}
	return { selectedRole, selectedPosition, selectedFight };
}

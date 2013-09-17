if (Rooms.find().count() === 0) {
	Rooms.insert({
		name: 'classroom',
		owner: 'teacher',
		state: 'list'
	});
}
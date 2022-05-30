export default class Group {
    constructor(params) {
        this.groupList = JSON.parse(JSON.stringify(params.groupList));
        this.roleList = JSON.parse(JSON.stringify(params.roleList));
    }
    get menu() {
        let group = JSON.parse(JSON.stringify(this.groupList));
        group.forEach((item) => {
            item.label = item.groupName;
            delete item.groupName;
            item.children = this.roleList
                .filter((role) => role.groupId == item.id)
                .map((item) => {
                    return { id: item.id, label: item.roleName };
                });
        });
        return group;
    }
}
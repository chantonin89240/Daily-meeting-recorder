<template>
    <div>
        <h2>Manage members</h2>

        <form @submit="addNewMember" v-if="newMember == false">
            <div>
                <input id="btnNew" class="btnComponent" type="submit" value="Add new member">
            </div>
        </form>

        <div v-if="newMember == true">
            <div>
                <input id="btnCancel" type="submit" @click="cancelAddNewMember" value="Cancel add new member">
            </div>
            <createMember></createMember>
        </div>

        <div>
            <h3>Member list</h3>
            <span class="listMembre" v-for="member in members" :key="member.id">
                <p>{{ member.username }} - {{ member.email }} <input id="btnCancel" @click="deleteMember(member.id)" type="submit" value="Delete member"></p>
                <hr class="hrSpe">
            </span>
        </div>
    </div>
</template>

<script>
import createMember from '../components/CreateMemberComponent.vue';
 //import router from '../router';
import ProjectService from '../services/projectService';

export default {
    name: 'manageMember',
    components: {
        createMember
    },
    data() {
        return {
            newMember: false,
            members: undefined,
            projectId: this.$route.params.projectId
        }
    },
    mounted(){
        this.projectService = new ProjectService();
        this.projectService.getAllMemberByProject(this.projectId).then(members => {
            this.members = members
        })
    },
    methods: {
        addNewMember(){
            this.newMember = true
        },
        cancelAddNewMember(){
            if(confirm('Are you sure you want to cancel the add ?')){
                this.newMember = false
            }
        },
        deleteMember(memberId){
            if(confirm('Are you sure you want to delete the member ')){
                this.projectService.deleteMemberOnProject(this.projectId, memberId);
                location.reload()
            }
        }

    } 
    
}
</script>

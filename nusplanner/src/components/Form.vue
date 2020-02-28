<template>
		<div id="app" class="container">
			
			<div class="col-xs-12">
			<!-- Typing in group name (this needs changes) -->
				<v-form ref="form">
					<v-text-field class= 'field' v-model="name" type="text" label="Group Name" placeholder=" ">
						</v-text-field>
					</v-form>
			<!-- Typing in group name ends here -->
				<div class="row  form-row" v-for="row in rows" v-bind:key = "row">
					<div class="col-xs-12">
						<div class="row">
							<div class="col-xs-12">
								<div class="col-xs-5">
									<input type="text" class="form-control" placeholder="Name" v-model="row.name">
								</div>
								<div class="col-xs-4">
									<input type="text" class="form-control" placeholder="Username" v-model="row.Username">
								</div>
								<div class="col-xs-1">
									<button class="btn btn-danger" @click="deleteRow(row)">X</button>
								</div>
							</div>
						</div>
						<div class="row" v-if="row.select==3 || row.select==4 ">
							<div class="row subrow" v-for="subrow in row.subrows" v-bind:key = "subrow">
								<div class="col-xs-12">
									<div class="col-xs-3"></div>
									<div class="col-xs-7">
										<input type="text" class="form-control" v-model="subrow.answer">
									</div>
									<div class="col-xs-2">
										<button class="btn btn-danger" @click="deleteSubrow(row,subrow)">X</button>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<button class="btn btn-success center-block" @click="addSubRow(row)">Add Answer</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<button type="submit" class="btn btn-info" @click="submit">Submit</button>
						<button type="submit" class="btn btn-success" @click="addRow">Add Row</button>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
export default {
    data: () => ({
        rows: [
            { 'select': 1, 'name': '', Username: '','check': false, 'subrows': [{  answer: ''}]}
        ]
    }),
    methods: {
		submit: function(){
			alert("Submitted! You can now close this form")
		},
        addRow: function() {
            this.rows.push({'select': 1, 'name': '', 'check': false, subrows: [{ answer: ''} ]});
        },
        deleteRow: function(row) {
            this.rows.$remove(row);
        },
        addSubRow: function(row) {
            row.subrows.push({ answer: ''})
        },
        deleteSubrow: function(row, subrow) {
            row.subrows.$remove(subrow);
        }
    }
}
</script>

<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.js);

    .form-row {
        border:  1px solid #e2e2e2;
        margin:  10px;
        padding: 20px;
        background: #f2f2f2;
    }
    .subrow {
        margin: 5px;
        padding:  5px;
    }
	.v-text-field{
		font-size: 5em;
		}
</style>



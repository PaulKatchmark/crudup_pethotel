$(function(){
  getPets();
  getOwners();

//we need on click functions for registerOwner, addPet, delete pet, updateinfo.
$('#owners').on('submit', registerOwner);
$('#pets').on('submit', addPet);
//$('').on('click', '.delete', deletePet);
$('#petsTable').on('click', '.update', updatePets);




});

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: displayPets
  });
}

function displayPets(response) {
  console.log(response);
  var $petsTable = $('#petsTable');
  $('.addedpet').empty();    //HEADER IS GONE!!!!!!
  response.forEach(function(pet){
  var $tr = $('<tr class="addedpet"><form class="petList"></form></tr>');
  // var $ownerOption = $('#ownerDropDown');
  //   $ownerOption.append('<option value="' + pet.owner_id + '">' + pet.first_name + " " + pet.last_name + '</option>');
    $tr.append('<td>' + pet.first_name + " " + pet.last_name + '</td>');
    $tr.append('<td><input type="text" name="petName" value="' + pet.name + '"/></td>');
    $tr.append('<td><input type="text" name="breed" value="' + pet.breed + '"/></td>');
    $tr.append('<td><input type="text" name="color" value="' + pet.color + '"/></td>');
    $tr.append('<td><button class="update" id="' + pet.id + '">Go</button>');
    $tr.append('<td><button class="delete">Go</button>');
    $tr.append('<td><div class="inAndOut"></div>'); //need to toggle between in or out pets
    // $tr.append($form);
    $petsTable.append($tr);
  });
}

function addPet(event) {
  event.preventDefault();

  var petData = $(this).serialize();


  $.ajax({
    type: 'POST',
    url: '/pets',
    data: petData,
    success: getPets
  });
  $(this).find('input').val('');
}

function getOwners() {
  $.ajax({
    type: 'GET',
    url: '/owners',
    success: displayOwners
  });
}
//empty owners each time
function displayOwners(response) {
        $('#ownerDropDown').empty();
  console.log(response);
  response.forEach(function(owner){
    var $ownerOption = $('#ownerDropDown');
    var $addOwner = $('<option value="' + owner.id + '">' + owner.first_name + " " + owner.last_name + '</option>');
    $ownerOption.append($addOwner);
  });
}

function registerOwner(event) {
  event.preventDefault();

  var ownerData = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/owners',
    data: ownerData,
    success: getOwners
  });
  $(this).find('input').val('');
}



// function inAndOut(event) {
//   var status = $(event).attr()
//   if ()
// }


function updatePets(event){
  event.preventDefault();
  console.log('this from updatePets', $(this));
  var $button = $(this);
  var $form = $button.closest('form');
  var data = $form.serialize();
  console.log('id from updatepets:', data);

$.ajax({
    type: 'PUT',
    url: '/pets/' + $button.data('id'),
    data: data,
    success: console.log(data)
  });
}

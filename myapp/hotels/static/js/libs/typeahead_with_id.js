/*
 * CakePHP Twitter Bootstrap Typeahead with id
 * ProjectsController.php
 * <?php $this->set('projects', $this->Project->find('list'); $this->render('list', 'ajax'); ?>
 * /app/View/Projects/list.ctp
 * <?php echo json_encode($projects); ?>
 * data = {'id': 'item name', ..};
 * /app/View/Tasks/index.ctp
 * <input type="hidden" id="TaskProjectId" name="data[Task][project_id]"/>
 * <input autocomplete="off" data-provide="typeahead" class="typeahead" type="search" id="TaskProject">
 */

var finished = true;
$('#TaskProject').typeahead({
    source: function(query, process){
        if(!finished) {
            return;
        }
        finished = false;
        $.getJSON('/projects/names/'+query,{}, function(response){
            var data = new Array(); 
            for(var i in response) {
                data.push(i+'_'+response[i]);
            }
            process(data);
            finished = true;
        });
    },
    highlighter: function(item) {
        var parts = item.split('_');
        parts.shift();
        return parts.join('_');
    },
    updater: function(item) {
        var parts = item.split('_');
        $('#TaskProjectId').val(parts.shift());
        return parts.join('_');
    },
    minLength: 0
});
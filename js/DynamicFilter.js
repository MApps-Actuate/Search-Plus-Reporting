/**
 * Adds filter conditions to table or Crosstab elements dynamically
 * 
 * Example:
 * 		var tableHandle = reportContext.getDesignHandle().findElement("tableProductLines");
 * 		if (tableHandle) {		// Sanity check
 * 			addTableFilter(tableHandle, 'dataSetRow["Product Line"]', DesignChoiceConstants.FILTER_OPERATOR_IN, 'params["prmProductLines"].value');
 * 		}
 * 
 */

importClass(Packages.org.eclipse.birt.report.model.api.elements.DesignChoiceConstants);
importClass(Packages.java.util.ArrayList);
importClass(Packages.org.eclipse.birt.report.model.api.StructureFactory);
importClass(Packages.org.eclipse.birt.report.model.api.Expression);
importClass(Packages.org.eclipse.birt.report.model.api.ExpressionType);
importClass(Packages.org.eclipse.birt.report.model.api.elements.DesignChoiceConstants);
importClass(Packages.org.eclipse.birt.report.model.api.elements.structures.FilterCondition)

/*
 * Add a filter condition to a table
 * 
 * tableHandle - Handle of the table element
 * colExpression - Column expression
 * Operator - Filter Operator
 * value - Filter value
 */
function addTableFilter(tableHandle, colExpression, operator, value) {
	// Call the add filter 
	addTableFilter(tableHandle, colExpression, operator, value, null);
}

/*
 * Add a range filter condition to a table 
 * tableHandle - Handle of the table element
 * colExpression - Column expression
 * operator - Filter Operator
 * values1 - Start value of the filter value range
 * values2 - End value of the filter value range
 */
function addTableFilter(tableHandle, colExpression, operator, values1, values2) {
	// Create a condition
    var filterCondition  = StructureFactory.createFilterCond();
    // Create an expression
	var expression = new Expression(colExpression, ExpressionType.JAVASCRIPT);
	// Update the expression with specified value
	filterCondition.setExpressionProperty( FilterCondition.EXPR_MEMBER, expression );
	filterCondition.setOperator(operator);
	if (values1)
		filterCondition.setValue1(values1);
	if (values2 != null)
		filterCondition.setValue2(values2);
	// Add it to the element
	var propHandle = tableHandle.getPropertyHandle("filter");
	propHandle.addItem(filterCondition);
}

/*
 * Add a filter to a Crosstab
 *
 * xtabHandle - Handle of the Crosstab element
 * colExpression - Column expression
 * operator - Filter Operator
 * value - Filter value
 */
function addXtabFilter(xtabHandle, colExpression, operator, value) {
	addXtabFilter(xtabHandle, colExpression, operator, value, null);
}

/*
 * Add a filter to a Crosstab
 *
 * xtabHandle - Handle of the Crosstab element
 * colExpression - Column expression
 * operator - Filter Operator
 * values1 - Start value of the filter value range
 * values2 - End value of the filter value range
 */
function addXtabFilter(xtabHandle, colExpression, operator, values1,values2) {
	// Create a condition
	var elementFactory = reportContext.getDesignHandle().getElementFactory();
	var filterCondition = elementFactory.newFilterConditionElement();
	// Create the column expression
  	var expression = new Expression(colExpression, ExpressionType.JAVASCRIPT);
  	filterCondition.setExpressionProperty( FilterCondition.EXPR_MEMBER, expression );
	elementFactory.setOperator(operator);
   
 	if (values1)
 		filterCondition.setValue1(values1);
	if (values2)
		filterCondition.setValue2(values2);
    // Add it to the crosstab
	var propHandle = xtabHandle.getPropertyHandle("filter"); 
	propHandle.add(filterCondition);
}

import React from 'react';

export default function weatherPage(props) {
    return (
        <div>
            <fieldset class="slds-form-element">
            <legend class="slds-form-element__legend slds-form-element__label">Select an app</legend>
            <div class="slds-form-element__control">
                <div class="slds-visual-picker slds-visual-picker_large">
                <input type="radio" id="visual-picker-75" value="visual-picker-75" name="options" />
                <label for="visual-picker-75">
                    <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                    <span class="slds-is-selected">
                        <span class="slds-icon_container">
                        <svg class="slds-icon slds-icon_large slds-icon-action-check" aria-hidden="true">
                            <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#check"></use>
                        </svg>
                        </span>
                    </span>
                    <span class="slds-is-not-selected">
                        <span class="slds-icon_container">
                        <svg class="slds-icon slds-icon-utility-connected_apps slds-icon_large slds-icon-text-default" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#connected_apps"></use>
                        </svg>
                        </span>
                    </span>
                    </span>
                    <span class="slds-visual-picker__body">
                    <span class="slds-text-title">Connected App</span>
                    </span>
                </label>
                </div>
                <div class="slds-visual-picker slds-visual-picker_large">
                <input type="radio" id="visual-picker-76" value="visual-picker-76" name="options" disabled="" />
                <label for="visual-picker-76">
                    <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                    <span class="slds-is-selected">
                        <span class="slds-icon_container">
                        <svg class="slds-icon slds-icon_large slds-icon-action-check" aria-hidden="true">
                            <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#check"></use>
                        </svg>
                        </span>
                    </span>
                    <span class="slds-is-not-selected">
                        <span class="slds-icon_container">
                        <svg class="slds-icon slds-icon-utility-custom_apps slds-icon_large slds-icon-text-default" aria-hidden="true">
                            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#custom_apps"></use>
                        </svg>
                        </span>
                    </span>
                    </span>
                    <span class="slds-visual-picker__body">
                    <span class="slds-text-title">Custom App</span>
                    </span>
                </label>
                </div>
            </div>
            </fieldset>
        </div>
    );
}

import { ComponentFactoryResolver, Directive, ElementRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { ButtonLoadingComponent } from '../../core/elements/button-loading/button-loading.component';

/**
 * @directive ButtonLoadingDirective
 * @description This directive is used to show a loading indicator on a button
 */
@Directive({
  selector: '[buttonLoading]'
})
export class ButtonLoadingDirective {
  /**
   * @description A flag that indicates if the view has been created
   * @type {boolean}
   */
  private hasView = false;

  /**
   * @constructor
   * @param componentFactoryResolver The component factory resolver
   * @param viewContainerRef The view container reference
   * @param elementRef The element reference
   * @param renderer2 The renderer service
   */
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2
  ) {}

  /**
   * @description Sets the button loading state
   * @returns {void}
   */
  @Input() set buttonLoading(loading: boolean) {
    if (loading && !this.hasView) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ButtonLoadingComponent);
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(componentFactory);
      this.renderer2.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
      this.hasView = true;
    } else if (!loading && this.hasView) {
      this.viewContainerRef.clear();
      this.renderer2.setStyle(this.elementRef.nativeElement, 'visibility', 'visible');
      this.hasView = false;
    }
  }
}

import * as $ from 'jquery';

/**
 * The TypeScript kernel of PhpPlaisio.
 */
export class Kernel
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Event triggered when all modules are loaded.
   */
  public static readonly eventTypeAllModulesLoaded: string = '2a6aedda-9abd-4490-898d-d7acc898cc29';

  /**
   * Event triggered when a beefy HTMl snippet has been added to the HTML document.
   */
  public static readonly eventTypeBeefyHtmlAdded: string = 'b65beb48-c06e-4bff-93cb-2dc6b5b4b619';

  /**
   * The singleton instance of this class.
   */
  private static instance: Kernel;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   */
  private constructor()
  {
    this.evalPhpPlaisioInlineJs();
    this.installObservers();
    Kernel.triggerAllModulesLoaded();
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns the singleton instance of the class.
   */
  public static getInstance(): Kernel
  {
    return this.instance || (this.instance = new this());
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers Kernel.eventTypeAllModulesLoad after all modules are loaded.
   */
  private static triggerAllModulesLoaded(): void
  {
    // @ts-ignore
    if (requirejs.s && $.isEmptyObject(requirejs.s.contexts._.registry))
    {
      $('body').trigger(Kernel.eventTypeAllModulesLoaded);
    }
    else
    {
      setTimeout(Kernel.triggerAllModulesLoaded, 25);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Executes JavaScript code dynamically generated in PHP.
   */
  private evalPhpPlaisioInlineJs(): void
  {
    if (window.hasOwnProperty('php_plaisio_inline_js'))
    {
      // @ts-ignore
      eval(php_plaisio_inline_js);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs all observers.
   */
  private installObservers(): void
  {
    const $body = $('body');
    $body.on(Kernel.eventTypeAllModulesLoaded, function ()
    {
      $body.trigger(Kernel.eventTypeBeefyHtmlAdded, $body);
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
// Plaisio\Console\Helper\TypeScript\TypeScriptMarkHelper::md5: f4e006d2b1bba3ce3dc0f991e71c50aa
